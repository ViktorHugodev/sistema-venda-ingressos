import { PartialType } from '@nestjs/mapped-types';
import { CreateSpotRequest } from './create-spot-request.dto';

export class UpdateSpotRequest extends PartialType(CreateSpotRequest) {}
