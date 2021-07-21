import { genMessage } from '../helps';

const modules = import.meta.globEager('./en/**.ts');
export default {
  message: {
    ...genMessage(modules, 'en'),
  },
};
