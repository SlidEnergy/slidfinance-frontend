import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/api';
import {Observable} from 'rxjs';
import {Router, ActivatedRoute} from '@angular/router';
import {AppEntityServicesService} from '../../../core/store/entity/app-entity-services.service';

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
        private dataContext: AppEntityServicesService) {
    }

    ngOnInit() {
        this.categories = this.dataContext.categories.getListLazy();
    }

    selectCategory(category: Category) {
        this.router.navigate(['../', 'add-transaction'], {relativeTo: this.route, queryParams: {categoryId: category.id}});
    }

}
