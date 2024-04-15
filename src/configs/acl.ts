// @ts-ignore
import { AbilityBuilder, Ability } from '@casl/ability'

export type Subjects = string
export type Actions = 'manage' | 'create' | 'read' | 'update' | 'delete'

export type AppAbility = Ability<[Actions, Subjects]> | undefined

export const AppAbility = Ability as any
export type ACLObj = {
  action: Actions
  subject: string
}

// export const RoleCode: {
//   SUPER_ADMIN: 'SUPER_ADMIN',
//   COMPANY_ADMIN: 'COMPANY_ADMIN',
//   ADMIN: 'ADMIN',
//   MANAGER: 'MANAGER',
//   INSPECTOR: 'INSPECTOR'
// };
/**
 * Please define your own Ability rules according to your app requirements.
 * We have just shown Admin and Client rules for demo purpose where
 * admin can manage everything and client can just visit ACL page
 */
type RoleCode =
  | 'ADMIN'
  | 'CUSTOMER'
  | 'CUSTOMER_WHOLESALE'
  | 'CITY_MANAGER'
  | 'STATE_MANAGER'
  | 'REGIONAL_MANAGER'
  | 'NATIONAL_MANAGER'
  | 'AFFILIATE'
const defineRulesFor = (role: RoleCode, subject: string) => {
  const { can, rules } = new AbilityBuilder(AppAbility)

  if (role === 'ADMIN') {
    // can('manage', 'all')
    can('itsHaveAccess', 'customer-page')
    can('itsHaveAccess', 'category-page')
    can('itsHaveAccess', 'product-page')
    can('itsHaveAccess', 'comission-page')
    can('itsHaveAccess', 'affialtes-page')
    can('itsHaveAccess', 'order-page')
    can('itsHaveAccess', 'order-order-detail-page')
    can('itsHaveAccess', 'dashboard-page')

    can('itsHaveAccess', 'product-add')
    can('itsHaveAccess', 'product-actions')
    can('itsHaveAccess', 'contact-requests')
    can('itsHaveAccess', 'profile-page')
  } else if (
    role === 'AFFILIATE' ||
    role === 'CUSTOMER' ||
    role === 'CUSTOMER_WHOLESALE' ||
    role === 'CITY_MANAGER' ||
    role === 'STATE_MANAGER' ||
    role === 'REGIONAL_MANAGER' ||
    role === 'NATIONAL_MANAGER'
  ) {
    can('itsHaveAccess', 'product-page')
    can('itsHaveAccess', 'comission-page')
    can('itsHaveAccess', 'copy-affiliate-link')
    can('itsHaveAccess', 'profile-page')

    // can('itsHaveAccess', 'order-order-detail-page')
    // can('itsHaveAccess', 'customer-page')
    // can('itsHaveAccess', 'order-page')
    // can('itsNotHaveAccess', 'product-add')
  }
  // else if (role === 'STUDENT') {
  //   can('itsHaveAccess', 'like-videos-page')
  // }
  //   // can('allow', 'project-add')
  // } else {
  //   can(['read', 'create', 'update', 'delete'], subject)
  return rules
}

export const buildAbilityFor = (role: RoleCode, subject: string): AppAbility => {
  return new AppAbility(defineRulesFor(role, subject), {
    // https://casl.js.org/v5/en/guide/subject-type-detection
    // @ts-ignore
    detectSubjectType: object => object!.type
  })
}

export const defaultACLObj: ACLObj = {
  action: 'manage',
  subject: 'all'
}

export default defineRulesFor
