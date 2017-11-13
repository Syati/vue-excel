import { mount } from 'avoriaz';
import Vue from 'vue';
import SheetCell from '@/components/SheetCell.vue';

describe('SheetCell', () => {
  let wrapper;

  beforeEach((done) => {
    wrapper = mount(SheetCell, { propsData: { value: 'hello' } });
    done();
  });

  it('has a default data', () => {
    expect(wrapper.data().isEditing).to.equal(false);
  });

  it('renders correctly', () => {
    expect(wrapper.find('.sheetCellValue')[0].text()).to.equal('hello');
  });

  it('renders correctly with different props', () => {
    wrapper = mount(SheetCell, { propsData: { value: 'world' } });
    expect(wrapper.find('.sheetCellValue')[0].text()).to.equal('world');
  });

  it('emits input with value when inputted', () => {
    const emitSpy = sinon.spy(wrapper.vm, '$emit');
    wrapper.trigger('click');
    wrapper.find('.sheetCellInput')[0].element.value = 'world';
    wrapper.find('.sheetCellInput')[0].trigger('input');

    expect(emitSpy).to.have.been.calledWith('input', 'world');
  });

  it('shows, focuses a input and hides a span when clicked', (done) => {
    expect(wrapper.data().isEditing).to.equal(false);
    expect(wrapper.find('.sheetCellValue')[0].hasStyle('display', 'none')).to.equal(false);
    expect(wrapper.find('.sheetCellInput')[0].hasStyle('display', 'none')).to.equal(true);

    wrapper.trigger('click');

    expect(wrapper.data().isEditing).to.equal(true);
    expect(wrapper.find('.sheetCellValue')[0].hasStyle('display', 'none')).to.equal(true);
    expect(wrapper.find('.sheetCellInput')[0].hasStyle('display', 'none')).to.equal(false);

    Vue.nextTick(() => {
      expect(document.activeElement.className).to.equal(wrapper.vm.$refs.cell.className);
      done();
    });
  });

  it('does not effect when clicked double', () => {
    wrapper.trigger('click');
    expect(wrapper.data().isEditing).to.equal(true);
    wrapper.trigger('click');
    expect(wrapper.data().isEditing).to.equal(true);
  });

  it('hides a input and shows a span when blur', () => {
    wrapper.trigger('click');
    wrapper.find('.sheetCellInput')[0].trigger('blur');
    expect(wrapper.data().isEditing).to.equal(false);
  });
});
