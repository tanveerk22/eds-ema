export default function decorate(block) {
  const heading = block.querySelector('h1, h2, h3');
  if (heading) {
    heading.classList.add('hero-accessories-title');
  }
}
