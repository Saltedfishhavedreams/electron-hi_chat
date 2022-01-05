export function translate(
  url: string,
  params?: queryTestInfoUsingGET.Params,
  options?: RequestOptions
): Promise<queryTestInfoUsingGET.Response> {
  return $api.request(`/translate/${url}`, params, options)
}
