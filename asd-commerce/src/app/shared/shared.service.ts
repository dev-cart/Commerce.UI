import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class SharedService {
    private reloadCatgrsSrc = new BehaviorSubject<boolean>(false);
    reloadCatgrs$ = this.reloadCatgrsSrc.asObservable();

    triggerReloadCatgrs() {
        this.reloadCatgrsSrc.next(true);
    }
}