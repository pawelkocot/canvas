import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {Snapshot} from '../model/snapshot';

@Component({
    selector: 'snapshot',
    template: `
        <div (click)='onSelect()' style="float: left">
            Snapshot ({{ snapshot.createdAt|date:"h:mm:ss" }})
            <figure>
                <img src="{{ snapshot.image.src }}">
            </figure>
        </div>
    `,
})
export class SnapshotComponent {
    @Input() snapshot:Snapshot;
    @Output() clicked = new EventEmitter();

    onSelect() {
        this.clicked.emit(this.snapshot);
    }
}