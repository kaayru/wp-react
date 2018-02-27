import DataStore from 'flux/stores/DataStore.js'

class Page extends React.Component {
  render() {
      console.log(this.props);
        const allData = DataStore.getPageBySlug('home')

        return (
            <div>
                <h2>Hello world! page</h2>
            </div>
        );
  }
}

export default Page;