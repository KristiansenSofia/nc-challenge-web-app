import { isPlatformBrowser } from '@angular/common'
import {
  Component,
  ElementRef,
  HostListener,
  Inject,
  Input,
  PLATFORM_ID,
  signal,
  SimpleChanges,
  AfterViewChecked,
} from '@angular/core'

@Component({
  selector: 'app-textfit',
  standalone: true,
  imports: [],
  templateUrl: './textfit.component.html',
  styleUrl: './textfit.component.css',
})
export class TextfitComponent implements AfterViewChecked {
  @Input()
  text!: string

  @HostListener('window:resize')
  onResize() {
    let p = this.elRef.nativeElement.querySelector('p')
    this.adjustFontSize(p)
  }

  isBrowser = signal(false)

  constructor(
    @Inject(PLATFORM_ID) platformId: object,
    private elRef: ElementRef,
  ) {
    // Without this, we get "window is not defined"
    this.isBrowser.set(isPlatformBrowser(platformId))
  }

  ngAfterViewChecked(): void {
    if (this.isBrowser()) {
      let p = this.elRef.nativeElement.querySelector('p')
      this.adjustFontSize(p)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.isBrowser() && this.text !== '') {
      let p = this.elRef.nativeElement.querySelector('p')
      this.adjustFontSize(p)
    }
  }

  adjustFontSize(element: any) {
    // Get styling
    if (!element.styleComputed) {
      element.styleComputed = this.computeStyle(element)
    }

    if (element.scrollWidth !== element.parentNode.clientWidth) {
      this.calculateStyles(element)
      this.applyStyle(element)
    }
  }

  computeStyle(element: any) {
    const style = window.getComputedStyle(element, null)

    element.currentFontSize = parseFloat(style.getPropertyValue('font-size'))
    element.display = style.getPropertyValue('display')
    element.whiteSpace = style.getPropertyValue('white-space')

    return true
  }

  calculateStyles(element: any) {
    // To make it more readable
    element.availableWidth = element.parentNode.clientWidth
    element.currentWidth = element.scrollWidth
    element.previousFontSize = element.currentFontSize

    // Calculate the new font size
    let newFontSize =
      (element.availableWidth / element.currentWidth) * element.previousFontSize

    // Set new fontSize
    element.currentFontSize = newFontSize
  }

  applyStyle(element: any) {
    element.style.whiteSpace = element.whiteSpace
    element.style.display = element.display
    element.style.fontSize = element.currentFontSize + 'px'
  }
}
