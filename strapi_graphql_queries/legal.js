module.exports = `
  query {
    termsAndCondition {
      content
      updatedAt
    }
    
    privacyPolicy {
      content
      updatedAt
    }
    
    returnPolicy {
      content
      updatedAt
    }
  }
`