import { Component, OnInit } from '@angular/core';
import { Category, CategoriesService } from 'src/app/api';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-category',
  templateUrl: './select-category.component.html',
  styleUrls: ['./select-category.component.scss']
})
export class SelectCategoryComponent implements OnInit {
  categories: Observable<Category[]>;
  
  constructor(private categoriesService: CategoriesService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.categories = this.categoriesService.getList();
  }

  selectCategory(category: Category) {
    this.router.navigate(['../', 'add-transaction'], { relativeTo: this.route, queryParams: { categoryId: category.id } })
  }

}
