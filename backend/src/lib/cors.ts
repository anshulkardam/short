import config from '@/config';

import type { CorsOptions } from 'cors';

const CorsOptions: CorsOptions = {
  origin(requestOrigin, callback) {
    if (requestOrigin && config.CORS_WHITELIST.includes(requestOrigin)) {
      callback(null, true);
    } else {
      callback(
        config.NODE_ENV === 'development' ? null : new Error('Not Allowed by CORS')
      );
    }
  },
};

export default CorsOptions;
