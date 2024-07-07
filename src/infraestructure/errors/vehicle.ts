export const vehicle_errors = [
  {
    identity: 'VEHICLE_NOT_FOUND',
    code: 1300,
    status: 404,
    name: 'Vehicle Not Found',
    message: 'The specified vehicle could not be found.',
  },
  {
    identity: 'VEHICLE_ALREADY_EXISTS',
    code: 1301,
    status: 409,
    name: 'Vehicle Already Exists',
    message: 'The vehicle already exists.',
  },
  {
    identity: 'VEHICLE_CREATION_FAILED',
    code: 1302,
    status: 500,
    name: 'Vehicle Creation Failed',
    message: 'Failed to create vehicle.',
  },
  {
    identity: 'VEHICLE_UPDATE_FAILED',
    code: 1303,
    status: 500,
    name: 'Vehicle Update Failed',
    message: 'Failed to update vehicle.',
  },
  {
    identity: 'VEHICLE_DELETION_FAILED',
    code: 1304,
    status: 500,
    name: 'Vehicle Deletion Failed',
    message: 'Failed to delete vehicle.',
  },
  {
    identity: 'VEHICLE_UNPROCESSABLE_CONTENT',
    code: 1305,
    status: 422,
    name: 'Unprocessable Content',
    message: '{message}',
  },
];
