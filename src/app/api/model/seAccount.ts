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
import { SeAccountExtra } from './seAccountExtra';


export class SeAccount { 
  id: string | null;
  name: string | null;
  nature: string | null;
  balance: number | null;
  currency_code: string | null;
  extra: SeAccountExtra | null;
  connection_id: string | null;
  created_at: Date | null;
  updated_at: Date | null;
}
