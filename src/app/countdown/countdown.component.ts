import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  SimpleChanges,
} from '@angular/core'
import { TextfitComponent } from '../textfit/textfit.component'

@Component({
  selector: 'app-countdown',
  standalone: true,
  imports: [TextfitComponent],
  templateUrl: './countdown.component.html',
  styleUrl: './countdown.component.css',
})
export class CountdownComponent implements OnInit, OnDestroy {
  @Input()
  inputDate!: string

  futureDate!: Date
  days!: number
  hours!: number
  minutes!: number
  seconds!: number
  countdown!: any

  ngOnInit() {
    this.days = 0
    this.hours = 0
    this.minutes = 0
    this.seconds = 0

    // Start countdown if:
    // - inputDate is set (persisted in session storage)
    // - no countdown exists
    if (this.inputDate !== '' && !this.countdown) {
      this.futureDate = new Date(this.inputDate)
      this.calculateTime()
      this.countdown = setInterval(() => this.calculateTime(), 1000)
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // If inputDate is cleared during runtime:
    // - reset properties
    // - clear countdown
    if (this.inputDate == '' && this.countdown) {
      this.days = 0
      this.hours = 0
      this.minutes = 0
      this.seconds = 0

      clearInterval(this.countdown)
    }

    // If a countdown is already running:
    // - clear countdown
    if (this.countdown) {
      clearInterval(this.countdown)
    }

    // Start countdown if:
    // - inputDate is set
    if (this.inputDate !== '') {
      this.futureDate = new Date(this.inputDate)
      this.calculateTime()
      this.countdown = setInterval(() => this.calculateTime(), 1000)
    }
  }

  ngOnDestroy() {
    clearInterval(this.countdown)
  }

  getCountdown() {
    return (
      this.days +
      ' days, ' +
      this.hours +
      ' h, ' +
      this.minutes +
      ' m, ' +
      this.seconds +
      ' s'
    )
  }

  calculateTime() {
    let futureDateUnixTimestamp = this.futureDate.getTime()
    let todayDateUnixTimestamp = new Date().getTime()

    let difference = futureDateUnixTimestamp - todayDateUnixTimestamp

    let days = Math.floor(difference / (1000 * 60 * 60 * 24))
    let hours = Math.floor(
      (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    )
    let minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((difference % (1000 * 60)) / 1000)

    this.days = days
    this.hours = hours
    this.minutes = minutes
    this.seconds = seconds
  }
}
