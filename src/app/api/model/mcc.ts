/**
 * SlidFinance
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v1
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MccCategory } from './mccCategory';


export class Mcc { 
  id: number;
  code: string | null;
  title: string | null;
  ruTitle: string | null;
  description: string | null;
  ruDescription: string | null;
  category: MccCategory | null;
  isSystem: boolean;
}

