import { isPlatformBrowser } from '@angular/common'
import { Component, OnInit, Inject, PLATFORM_ID, signal } from '@angular/core'
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms'
import { CountdownComponent } from '../countdown/countdown.component'
import { TextfitComponent } from '../textfit/textfit.component'

@Component({
  selector: 'app-event',
  standalone: true,
  imports: [ReactiveFormsModule, CountdownComponent, TextfitComponent],
  templateUrl: './event.component.html',
  styleUrl: './event.component.css',
})
export class EventComponent implements OnInit {
  eventForm = new FormGroup({
    title: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
  })

  isBrowser = signal(false)

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    // Without this, we get "sessionStorage is not defined"
    this.isBrowser.set(isPlatformBrowser(platformId))
  }

  ngOnInit() {
    if (this.isBrowser()) {
      this.getPersistedValues()
    }

    // Subscribe to input changes
    this.onChanges()
  }

  onChanges(): void {
    this.eventForm.get('title')?.valueChanges.subscribe((val) => {
      if (val) {
        this.setPersistedValues('title', val)
      } else {
        sessionStorage.removeItem('title')
      }
    })

    this.eventForm.get('date')?.valueChanges.subscribe((val) => {
      if (val) {
        this.setPersistedValues('date', val)
      } else {
        sessionStorage.removeItem('date')
      }
    })
  }

  getPersistedValues() {
    let title = sessionStorage.getItem('title')
    let date = sessionStorage.getItem('date')

    if (title) {
      this.eventForm.patchValue({
        title: title,
      })
    } else {
      this.eventForm.patchValue({
        title: '',
      })
    }

    if (date) {
      this.eventForm.patchValue({
        date: date,
      })
    } else {
      this.eventForm.patchValue({
        date: '',
      })
    }
  }

  setPersistedValues(key: string, val: string) {
    sessionStorage.setItem(key, val)
  }

  getEventTitle() {
    if (this.eventForm.value.title) {
      return 'Time to ' + this.eventForm.value.title
    }
    return 'Time to'
  }

  getEventDate() {
    if (this.eventForm.value.date) {
      return this.eventForm.value.date
    }
    return ''
  }

  // Fail safe to avoid user from choosing past date
  // Does not work on iPhone or iPad -
  // since the "min" attribute on input type=date is not supported
  getTomorrow() {
    let tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toLocaleDateString()
  }
}
