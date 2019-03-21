/**
`d2l-organization-date`
Polymer-based web component for a organization date such as start and end date for a course.
@demo demo/d2l-organization-date/d2l-organization-date-demo.html Organization Name
*/

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import { mixinBehaviors } from '@polymer/polymer/lib/legacy/class.js';
import 'd2l-polymer-siren-behaviors/store/entity-behavior.js';
import '../d2l-organization-behavior.js';
import './localize-behavior.js';

/**
 * @customElement
 * @polymer
 */
class OrganizationDate extends mixinBehaviors([
	D2L.PolymerBehaviors.Siren.EntityBehavior,
	D2L.PolymerBehaviors.Organization.Date.LocalizeBehavior,
	D2L.PolymerBehaviors.Organization.Behavior
], PolymerElement) {
	static get template() {
		return html`
            <span hidden$="[[!_statusText]]">[[_statusText]]</span>
		`;
	}

	static get properties() {
		return {
			entity: {
				type: Object
			},
			_statusText: {
				type: String,
				value: null
			},
			_startDate: String,
			_endDate: String,
			_entityStatus: String,
			hideCourseStartDate: {
				type: Boolean,
				value: false
			},
			hideCourseEndDate: {
				type: Boolean,
				value: false
			}
		};
	}

	static get observers() {
		return [
			'_getOrganizationDate(entity)',
			'_setOrganizationDate(hideCourseStartDate, hideCourseEndDate, _startDate, _endDate, _entityStatus)',
			'_sendVoiceReaderInfo(_statusText)'
		];
	}

	static get is() {
		return 'd2l-organization-date';
	}

	_getOrganizationDate(entity) {
		this._startDate = entity && entity.properties && entity.properties.startDate || '';
		this._endDate = entity && entity.properties && entity.properties.endDate || '';
		this._entityStatus = entity && entity.properties && entity.properties.isActive || '';
	}

	_setOrganizationDate(hideCourseStartDate, hideCourseEndDate, courseStartDate, courseEndDate, entityStatus) {
		var nowDate = Date.now();
		var startDate = Date.parse(courseStartDate);
		var endDate = Date.parse(courseEndDate);
		if (startDate > nowDate) {
			startDate = new Date(startDate);
			this._statusText = this.localize('startsAt', 'date', this.formatDate(startDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(startDate));
			if (hideCourseStartDate) {
				this._statusText = null;
			}

		} else if (endDate < nowDate) {
			endDate = new Date(endDate);
			this._statusText = this.localize('ended', 'date', this.formatDate(endDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(endDate));
			if (hideCourseEndDate) {
				this._statusText = null;
			}

		} else if (endDate >= nowDate) {
			endDate = new Date(endDate);
			this._statusText = this.localize('endsAt', 'date', this.formatDate(endDate, {format: 'MMMM d, yyyy'}), 'time', this.formatTime(endDate));
			if (hideCourseEndDate) {
				this._statusText = null;
			}
		}

		if (this._statusText || !entityStatus) {
			this.fire('d2l-organization-date', {
				active: !!entityStatus,
				beforeStartDate: startDate ? startDate > nowDate : null,
				afterEndDate: endDate ? endDate <= nowDate : null
			});
		}
	}

	_sendVoiceReaderInfo(statusText) {
		if (!statusText) {
			return;
		}

		var details = {
			organization: {
				date: statusText
			},
		};
		this._fireD2lOrganizationAccessible(details);
	}
}

window.customElements.define(OrganizationDate.is, OrganizationDate);
