export const brand_errors = [
  {
    identity: 'BRAND_NOT_FOUND',
    code: 1400,
    status: 404,
    name: 'Brand Not Found',
    message: 'The specified brand could not be found.',
  },
  {
    identity: 'BRAND_ALREADY_EXISTS',
    code: 1401,
    status: 409,
    name: 'Brand Already Exists',
    message: 'The brand already exists.',
  },
  {
    identity: 'BRAND_CREATION_FAILED',
    code: 1402,
    status: 500,
    name: 'Brand Creation Failed',
    message: 'Failed to create brand.',
  },
  {
    identity: 'BRAND_UPDATE_FAILED',
    code: 1403,
    status: 500,
    name: 'Brand Update Failed',
    message: 'Failed to update brand.',
  },
  {
    identity: 'BRAND_DELETION_FAILED',
    code: 1404,
    status: 500,
    name: 'Brand Deletion Failed',
    message: 'Failed to delete brand.',
  },
  {
    identity: 'BRAND_UNPROCESSABLE_CONTENT',
    code: 1405,
    status: 422,
    name: 'Unprocessable Content',
    message: '{message}',
  },
];
