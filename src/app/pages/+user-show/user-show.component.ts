import {Component, OnInit} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {styles} from './user-show.component.styles';

@Component({
  selector: 'mpt-user-show',
  templateUrl: 'user-show.component.html',
})
export class UserShowComponent implements OnInit {

  styles: any = styles;
  userId: string;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
    });
  }

}
