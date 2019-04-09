import '../scss/main.scss';
import 'bootstrap';
import 'daemonite-material';

require.context('../img/', true, /\.(png|svg|jpg|gif|ico)$/);

$(() => {
  console.log('ready: ' + new Date());
});

console.log('Hello world: ' + new Date());
