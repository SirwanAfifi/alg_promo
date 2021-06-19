export class CreatePromoCodeDto {
  readonly description: string;
  readonly serviceId: number;
  readonly percentage: number;
  readonly activeFrom: Date;
  readonly activeTo: Date;
}
