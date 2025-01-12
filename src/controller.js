import { getForCountry, getForAllCountries, getHomePage } from './service';
import GetForCountryByNameSchema from './dto/get-for-country-by-name.schema';
import GetForCountryByCodeSchema from './dto/get-for-country-by-code.schema';
import GetForAllSchema from './dto/get-for-all.schema';
import validateDTO from './dto/validate-dto';

export async function goHome(req, res) {
  res.send(await getHomePage());
}

export async function getForCountryByName(req, res, next) {
  try {
    const dto = validateDTO(GetForCountryByNameSchema, req.params, req.query);
    const result = await getForCountry(dto);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

export async function getForCountryByCode(req, res, next) {
  try {
    const dto = validateDTO(GetForCountryByCodeSchema, req.params, req.query);
    const result = await getForCountry(dto);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}

export async function getForAll(req, res, next) {
  try {
    const dto = validateDTO(GetForAllSchema, req.params, req.query);
    const result = await getForAllCountries(dto);

    res.status(200).send(result);
  } catch (e) {
    next(e);
  }
}
