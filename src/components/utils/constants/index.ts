export function calculateProfileCompletion(profile: any) {
  const profileAttributes = {
    professional_role: 10,
    profile_image: 10,
    // title: 10,
    hourly_rate: 5,
    description: 5,
    skills: 5,
    categories: 5,
    sub_categories: 5,
    // profile_verified: 5,
    // payment_verified: 5,
    // payment_details: 5,
    experience: 10,
    education: 10,
    portfolio: 10,
    // linked_accounts: 5,
  };

  let totalWeight = 0;
  let completedWeight = 0;
  const uncompletedAttributes: string[] = [];

  for (const attribute in profileAttributes) {
    totalWeight += profileAttributes[attribute];
    if (Array.isArray(profile[attribute])) {
      if (profile[attribute].length > 0) {
        completedWeight += profileAttributes[attribute];
      } else {
        uncompletedAttributes.push(attribute);
      }
    } else if (profile[attribute]) {
      completedWeight += profileAttributes[attribute];
    } else {
      uncompletedAttributes.push(attribute);
    }
  }

  const percentage = (completedWeight / totalWeight) * 100;

  return {
    percentage: percentage.toFixed(),
    uncompleted: uncompletedAttributes,
  };
}
