import { Component, OnInit } from '@angular/core';
import { Category, CategoriesService } from 'src/app/api';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/app-state';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  categories: Observable<Category[]>;
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>) { }

  ngOnInit() {
    this.categories = this.store.select(x => x.core.categories).pipe(filter(x=>!!x), map(x=>Array.from(x.values())));
  }

  selectCategory(category: Category) {
    this.router.navigate(['../', 'add-transaction'], { relativeTo: this.route, queryParams: { categoryId: category.id } })
  }

}
