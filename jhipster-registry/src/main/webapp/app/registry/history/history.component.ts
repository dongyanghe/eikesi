import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbTabChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { EurekaHistory, EurekaHistoryType, History, HistoryService } from './history.service';
import { RefreshService } from 'app/shared/refresh/refresh.service';

@Component({
  selector: 'jhi-history',
  templateUrl: './history.component.html'
})
export class HistoryComponent implements OnInit, OnDestroy {
  histories?: History;
  eurekaHistory?: EurekaHistory;
  activeKey?: EurekaHistoryType;
  unsubscribe$ = new Subject();

  constructor(private historyService: HistoryService, private refreshService: RefreshService) {}

  ngOnInit(): void {
    this.refreshService.refreshReload$.pipe(takeUntil(this.unsubscribe$)).subscribe(() => this.refresh());
    this.refresh();
  }

  refresh(): void {
    this.historyService
      .findAll()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(history => {
        this.eurekaHistory = history;
        if (this.activeKey) {
          this.activate(this.activeKey);
        } else {
          this.activate('registered');
        }
      });
  }

  activate(key: EurekaHistoryType): void {
    this.activeKey = key;
    this.histories = this.activeKey === 'registered' ? this.eurekaHistory!.registered : this.eurekaHistory!.canceled;
  }

  beforeChange($event: NgbTabChangeEvent): void {
    this.activate($event.nextId as EurekaHistoryType);
  }

  ngOnDestroy(): void {
    // prevent memory leak when component destroyed
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
