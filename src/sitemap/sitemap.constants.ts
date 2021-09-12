import { ETopLevelCategory } from 'src/topPage/topPage.model';

type TRouteMapType = Record<ETopLevelCategory, string>

export const CATEGORY_URL: TRouteMapType = {
	0: '/courses',
	1: '/services',
	2: '/books',
	3: '/products'
};
