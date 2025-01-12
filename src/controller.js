import Service from './service';
import GetForCountrySchema from './dto/get-for-country.schema';
import GetForCountryRespSchema from './dto/get-for-country-response.schema';
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

  async getEmissionForCountry(req, res, next) {
    try {
      const dto = validateDTO(GetForCountrySchema, { ...req.params, ...req.query });
      const data = await Service.getForCountry(dto);
      const transformedData = validateDTO(GetForCountryRespSchema, data);

      res.status(200).send(transformedData);
    } catch (e) {
      next(e);
    }
  },
};
