import { Pipe, PipeTransform } from '@angular/core';
/*
 * Make a string's first character uppercase
 * Usage:
 *   value 
 * Example:
 *   {{ "example string" |  ucFirst}}
 *   formats to: Example String
*/
@Pipe({name: 'ucFirst'})
export class UcFirstPipe implements PipeTransform {
  transform(value: string): string {
    return value.substring(0, 1).toUpperCase() + value.substring(1);
  }
}