import Service from './service';
import GetEmissionSchema from './dto/get-emission.schema';
import GetEmissionRespSchema from './dto/get-emission-response.schema';
import validateDTO from './dto/validate-dto';

export default {
  async goHome(req, res, next) {
    try {
      const homePage = await Service.getHomePage();

      res.status(200).send(homePage);
    } catch (e) {
      next(e);
    }
  },

  async getEmission(req, res, next) {
    try {
      const dto = validateDTO(GetEmissionSchema, { ...req.params, ...req.query });
      const data = await Service.getEmission(dto);
      // const transformedData = validateDTO(GetEmissionRespSchema, data);
      //
      // res.status(200).send(transformedData);

      res.status(200).send(data);
    } catch (e) {
      next(e);
    }
  },
};
