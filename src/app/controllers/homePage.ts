//~Import modules
import { Foo } from '../../Types/main.js';
import {Request, Response} from 'express';

//~Controllers
function renderHomePage(req: Request, res: Response) {
  const foo: Foo = { name: 'Bar' };
  const baz = 'string';
  console.log('baz: ', baz);

  res.status(200).json(foo);
}

export { renderHomePage };
