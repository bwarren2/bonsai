export default function(){
  this.transition(
    this.fromRoute('brainstorm'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('refine'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('plan'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('execute'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('review'),
    this.use('toLeft'),
    this.reverse('toRight')
  );

  this.transition(
    this.fromRoute('login'),
    this.use('toRight'),
    this.reverse('toLeft')
  );

  this.transition(
    this.toRoute('me'),
    this.use('fade', { duration: 5000 }),
    this.reverse('fade', { duration: 5000 })
  );

}
