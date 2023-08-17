import {Component, Input} from '@angular/core'
import {NgClass} from "@angular/common";

/**
 * @author Jean Paul <jeanpaulwebb@gmail.com>
 * @class ButtonComponent
 * @date 17/08/2023
 */
@Component({
  selector: 'lib-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  standalone: true, //standalone components
  imports: [
    NgClass
  ],
})
export class ButtonComponent {
  @Input() public variant!: 'primary' | 'secondary';
  @Input() public size: 'sm' | 'md' | 'lg' = 'md';
}
