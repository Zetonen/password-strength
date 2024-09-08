import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  firstSectionClass = 'bg-gray';
  secondSectionClass = 'bg-gray';
  thirdSectionClass = 'bg-gray';
  hintText = 'Enter password';
  hintColor = 'light';

  form = new FormGroup({
    password: new FormControl('', {}),
  });
  handlePasswordChange() {
    const value: string = this.form.value.password ?? '';

    const hasLetters = /[a-zA-Z]/.test(value);
    const hasNumbers = /\d/.test(value);
    const hasSymbols = /[!@#$%^&*(),.?":{}|<>]/.test(value);

    if (value?.length === 0) {
      this.setSectionColors('bg-gray', 'bg-gray', 'bg-gray');
      this.setSectionHint('Enter password', 'light');
    } else if (value?.length < 8) {
      this.setSectionColors('bg-red', 'bg-red', 'bg-red');
      this.setSectionHint('Password must be > 7 characters', 'red');
    } else if (hasLetters && hasNumbers && hasSymbols) {
      this.setSectionColors('bg-green', 'bg-green', 'bg-green');
      this.setSectionHint('Password is strong', 'green');
    } else if (
      (hasLetters && hasNumbers) ||
      (hasLetters && hasSymbols) ||
      (hasNumbers && hasSymbols)
    ) {
      this.setSectionColors('bg-yellow', 'bg-yellow', 'bg-gray');
      this.setSectionHint('Password is medium', 'yellow');
    } else {
      this.setSectionColors('bg-red', 'bg-gray', 'bg-gray');
      this.setSectionHint('Password is weak', 'red');
    }
  }
  setSectionColors(first: string, second: string, third: string): void {
    this.firstSectionClass = first;
    this.secondSectionClass = second;
    this.thirdSectionClass = third;
  }
  setSectionHint(text: string, color: string): void {
    this.hintText = text;
    this.hintColor = color;
  }
}
