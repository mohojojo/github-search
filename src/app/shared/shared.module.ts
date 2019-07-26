import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';

import { BemModule } from 'angular-bem';

import { Routes, RouterModule } from '@angular/router';
import {
  MatListModule,
  MatButtonModule,
  MatTableModule,
  MatToolbarModule,
  MatIconModule,
  MatInputModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatDialogModule
} from '@angular/material';

const COMPONENTS = [
];

@NgModule({
    declarations: COMPONENTS,
    exports: [
      ...COMPONENTS,
      BemModule,
      CommonModule,
      MatTableModule,
      MatButtonModule,
      MatListModule,
      MatToolbarModule,
      MatIconModule,
      MatInputModule,
      MatFormFieldModule,
      MatPaginatorModule,
      MatProgressSpinnerModule,
      MatDialogModule,
      FormsModule
    ],
    imports: [
        CommonModule,
        BemModule,
        ReactiveFormsModule,
        FormsModule,
        MatButtonModule,
        // RouterModule.forChild(routes)
    ],
    schemas: [
      CUSTOM_ELEMENTS_SCHEMA,
    ]
})
export class SharedModule {}
