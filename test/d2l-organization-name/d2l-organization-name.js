import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
window.D2L.Siren.WhitelistBehavior._testMode(true);
describe('d2l-organization-name', () => {
	var sandbox,
		component,
		organizationEntity;

	beforeEach(() => {
		sandbox = sinon.sandbox.create();

		component = fixture('org-name');

		organizationEntity = {
			name: function() { return 'Test Course Name'; }
		};
	});

	afterEach(() => {
		sandbox.restore();
	});

	describe('observers', () => {
		it('should call _sendVoiceReaderInfo upon changes to _organizationName', done => {
			var spy = sandbox.spy(component, '_sendVoiceReaderInfo');

			component.set('_organizationName', 'Course Name');
			afterNextRender(component, () => {
				expect(spy).to.have.been.calledOnce;
				done();
			});
		});

	});

	describe('fetching organization', () => {
		it('should set the _organizationName', done => {
			component._onOrganizationChange(organizationEntity);
			afterNextRender(component, () => {
				expect(component._organizationName).to.equal('Test Course Name');
				done();
			});
		});

	});

});
