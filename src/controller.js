import Service from './service.js';
import GetEmissionSchema from './dto/get-emission.schema.js';
import GetEmissionRespTransform from './dto/get-emission-response.schema.js';
import validateDTO from './dto/validate-dto.js';

const service = new Service();

export default {
  async goHome(req, res, next) {
    try {
      const homePage = await service.getHomePage();

      res.status(200).send(homePage);
    } catch (e) {
      next(e);
    }
  },

  async getEmission(req, res, next) {
    try {
      const dto = validateDTO(GetEmissionSchema, { ...req.params, ...req.query });
      const data = await service.getEmission(dto);
      const { value: transformedData } = GetEmissionRespTransform(data);

      res.status(200).send(transformedData);
    } catch (e) {
      next(e);
    }
  },
};
