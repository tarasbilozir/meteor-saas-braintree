/*
* Controller: Select Plan
* Template: /client/views/public/signup/select-plan.html
*/

/*
* Helpers
*/

Template.selectPlan.rendered = function(){
  // A little UX touch, set the first plan in our list to be selected. We can
  // change this to any item in the list, so for fancy folks you could have this
  // be selected based on real metrics for your most popular plan :)
  var firstPlanItem = $('.select-plan a:first-child');
  firstPlanItem.addClass('active');
  firstPlanItem.find('input').prop("checked", true);

}

/*
* Helpers
*/

Template.selectPlan.helpers({
  plans: function(){
    var getPlans = Meteor.settings.public.plans;
    var userId   = Meteor.userId();

    var todos = TodoLists.find({owner: userId}).fetch();

    // If user has more than 5 todos created and cancels subscription,
    // he can only resubscribe for higher tier subscription until he
    // cuts todos count to 5.
    if (todos.length > 5) {
      return _.where(getPlans, {limit: 15});
    } else {
      return getPlans;
    }
  }
});

/*
* Events
*/

Template.selectPlan.events({
  'click .list-group-item': function(e){
    var parent = $(e.target).closest('.list-group-item');
    parent.addClass("active");
    $('.list-group-item').not(parent).removeClass("active");
    parent.find('input[type="radio"]').prop("checked", true);
  }
});
