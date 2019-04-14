import { Container } from 'inversify';
import Portal from '../modules/Portal';

export function load(parmas: any = {}) {
  const { bootstrap, modules, ...option } =  parmas;
  const container = new Container({ skipBaseClassChecks: true });
  Object.keys(modules).forEach(key => {
    container.bind(key).to(modules[key]);
  });
  container.bind("AppOptions").toConstantValue(option);
  const portal: Portal = container.get(bootstrap);
  portal.bootstrap();
  const app = portal.createApp();
  return {
    portal,
    app,
  };
}