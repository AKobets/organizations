'use strict';

import {dedupingMixin} from '@polymer/polymer/lib/utils/mixin.js';

/* @polymerMixin */
const LangFrImpl = (superClass) => class extends superClass {
	constructor() {
		super();
		this.fr = {
			'errorFull': 'Oops! We were unable to fetch information for {num} of your tabs. Try refreshing the page',
			'errorShort': 'Oops',
			'loading': 'Chargement',
			'newNotifications': '{name} - Vous avez de nouvelles alertes'
		};
	}
};

export const LangFr = dedupingMixin(LangFrImpl);
