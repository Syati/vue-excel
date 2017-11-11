import { mount } from 'avoriaz';
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

  it('shows input.sheetCellInput and hides a span.sheetCellValue when clicked', () => {
    expect(wrapper.find('.sheetCellValue')[0].hasStyle('display', 'none')).to.equal(false);
    expect(wrapper.find('.sheetCellInput')[0].hasStyle('display', 'none')).to.equal(true);

    wrapper.trigger('click');

    expect(wrapper.data().isEditing).to.equal(true);
    expect(wrapper.find('.sheetCellValue')[0].hasStyle('display', 'none')).to.equal(true);
    expect(wrapper.find('.sheetCellInput')[0].hasStyle('display', 'none')).to.equal(false);
  });

  it('emits input with value when inputted', () => {
    const emitSpy = sinon.spy(wrapper.vm, '$emit');

    wrapper.trigger('click');
    wrapper.find('.sheetCellInput')[0].element.value = 'world';
    wrapper.find('.sheetCellInput')[0].trigger('input');

    expect(emitSpy).to.have.been.calledWith('input', 'world');
  })
});
