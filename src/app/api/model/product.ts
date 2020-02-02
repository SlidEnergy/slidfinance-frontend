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
import { ProductType } from './productType';


export interface Product { 
    id?: number;
    title?: string | null;
    bankId?: number | null;
    type?: ProductType;
    image?: string | null;
    isPublic?: boolean;
    approved?: boolean;
}

