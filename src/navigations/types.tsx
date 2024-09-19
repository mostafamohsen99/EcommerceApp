import {ImageSourcePropType} from 'react-native';
import {CompositeNavigationProp} from '@react-navigation/native';
import {MaterialTopTabNavigationProp} from '@react-navigation/material-top-tabs';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

export type NewPasswordProps = {
  email: string;
};

export type SignStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  ForgotPassword: undefined;
  NewPassword: {email: String};
  home: BottomTabNavigatorParamList;
  search: undefined;
};

export type ShopStackParamList = {
  shop: undefined;
  searchCategories: undefined;
  searchItems: {
    id: string | undefined;
    name: string | undefined;
    Items?: searchItem[];
  };
  filters: undefined;
  brand: undefined;
  specificItem: searchItem;
};

export type BottomTabNavigatorParamList = {
  Home: undefined;
  Shop: ShopStackParamList;
  Bag: undefined;
  Favorites: undefined;
  Profile: undefined;
};

export type TopTabNavigatorParamList = {
  Shop: undefined;
  Men: undefined;
  Women: undefined;
  Kids: undefined;
};

export type saleItem = {
  id: string;
  data?: string;
  percentage?: string;
  added_to_favorites?: boolean;
  stars?: string;
  rate?: string;
  before_discount?: string;
  after_discount?: string;
  cloth_image?: ImageSourcePropType;
  gray_word?: string;
  black_word?: string;
  isNew?: boolean;
};

export type saleItemProps = {
  item: saleItem;
  index: number;
};

export type listItem = {
  id?: string;
  name?: string;
  img?: ImageSourcePropType;
  insideItems?: searchItem[];
};

export type listItemProps = {
  item: listItem;
  navigation?:
    | CategoriesMenNavigationProp
    | CategoriesWomenNavigationProp
    | CategoriesKidsNavigationProp;
  index: number;
};

export type searchItem = {
  id?: string;
  stars?: string;
  rate?: string;
  grayword?: string;
  blackword?: string;
  price?: string;
  percentage?: string;
  img?: ImageSourcePropType;
  addedToFavorites?: boolean;
  date?: string;
  sizes?: string[];
  colors?: string[];
  brand?: string;
};

export type searchItemProps = {
  item: searchItem;
  index: number;
  navigation?: any;
};

export type RateReviewsItem = {
  id?: string;
  count_5?: string;
  count_4?: string;
  count_3?: string;
  count_2?: string;
  count_1?: string;
  desc?: string;
  comments?: commentsProps[];
};

export type commentsProps = {
  id: string;
  name: string;
  stars: string;
  date: string;
  profileImg: string;
  commentDesc: string;
  imgs?: string[];
};
export type commentsPropsItem = {
  item: commentsProps;
  index: number;
};

export interface sortWaysProps {
  id: string;
  name: string;
  function: () => void;
}

export type brandItem = {
  id: string;
  brand: string;
};

export type brandItemProps = {
  item: brandItem;
  index: number;
};

export type filterModalProps = {
  applyFn: () => void;
  discardFn: () => void;
};

export type userProps = {
  userName: string | undefined;
  email: string | undefined;
  profilePic: string | undefined;
  uid: string | undefined;
};

export type CategoriesMenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabNavigatorParamList, 'Men'>,
  StackNavigationProp<ShopStackParamList>
>;

export type CategoriesWomenNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabNavigatorParamList, 'Women'>,
  StackNavigationProp<ShopStackParamList>
>;

export type CategoriesKidsNavigationProp = CompositeNavigationProp<
  MaterialTopTabNavigationProp<TopTabNavigatorParamList, 'Kids'>,
  StackNavigationProp<ShopStackParamList>
>;

export type sortby =
  | 'Popular'
  | 'Newest'
  | 'Customer review'
  | 'Price:lowest to high'
  | 'Price:highest to low';

export type searchItemsScreenProps = StackScreenProps<
  ShopStackParamList,
  'searchItems'
>;

export type specificItemScreenProps = StackScreenProps<
  ShopStackParamList,
  'specificItem'
>;
