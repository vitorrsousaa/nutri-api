import FindAllAnamnesisTemplateByUserController from '../../../app/modules/AnamnesisTemplate/controllers/FindAllAnamnesisTemplateController';
import { makeFindAllAnamnesisTemplateByUserService } from '../services/makeFindAllAnamnesisTemplateByUser';

export function makeFindAllAnamnesisTemplateByUserController() {
  return new FindAllAnamnesisTemplateByUserController(
    makeFindAllAnamnesisTemplateByUserService()
  );
}
