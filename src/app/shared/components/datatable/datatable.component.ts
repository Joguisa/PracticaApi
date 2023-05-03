import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { TableColumnModel } from '../models/table-column.model';
import { TableConfigModel } from '../models/table-config.model';
import { TableActionsModel } from '../models/table-actions.model';

import { TABLE_ACTION } from '../enums/TABLE_ACTION.enum';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit, AfterViewInit {

  @Input() dataSource: MatTableDataSource<Array<any>> = new MatTableDataSource(); // preguntar si se deja así o se usa este nombre para todas las tablas o se usan las diferentes definiciones en los TS de cada tabla para dataSource

  displayedColumns: string[] = [];
  tableColumns: TableColumnModel[] = [];
  tableConfig: TableConfigModel | undefined;

  @Input() filterValue!: string;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  @Input() set columns(columns: TableColumnModel[]) {
    this.tableColumns = columns;
    this.displayedColumns = this.tableColumns.map((col) => col.def);
  }

  @Input() set config(config: TableConfigModel) {
    this.setConfig(config);
  }

  @Output() action: EventEmitter<TableActionsModel> = new EventEmitter();
  

  setConfig(config: TableConfigModel) {
    this.tableConfig = config;

    if (this.tableConfig.showActions) {
      this.displayedColumns.push('acciones');
    }
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.data);
  }

  editar(element: any) {
    this.action.emit({ action: TABLE_ACTION.EDIT, element });
  }

  eliminar(element: any) {
    this.action.emit({ action: TABLE_ACTION.DELETE, element });
  }

}
