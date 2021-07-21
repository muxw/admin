import { genMessage } from '../helps';

const modules = import.meta.globEager('./cn/**.ts');
export default {
  message: {
    ...genMessage(modules, 'cn'),
  },
};
