import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SearchPipePipe } from "./search-pipe.pipe";

@NgModule({
    declarations:[
        SearchPipePipe,
    ],
    imports:[
        RouterModule,
        CommonModule
    ],
    exports:[
        SearchPipePipe
    ]
})
export class FilterModule{

}