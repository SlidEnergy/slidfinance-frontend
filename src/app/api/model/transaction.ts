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


export class Transaction { 
  id: number | null;
  accountId: number;
  dateTime: Date;
  amount: number;
  categoryId: number | null;
  description: string | null;
  userDescription: string | null;
  mcc: number | null;
  bankCategory: string | null;
  approved: boolean;
}

