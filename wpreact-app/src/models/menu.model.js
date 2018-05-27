// @flow

export class Menu {
  count: number;
  description: string;
  filter: string;
  items: Array<MenuItem>;
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;
};

export class MenuItem {
  ID: number;
  attr_title: string;
  classes: Array<string>;
  comment_count: string;
  comment_status: string;
  db_id: number;
  description: string;
  filter: string;
  guid: string;
  items: Array<MenuItem>; // Not in WP model
  menu_item_parent: string;
  menu_order: number;
  object: string;
  object_id: string;
  ping_status: string;
  pinged: string;
  post_author: string;
  post_content: string;
  post_content_filtered: string;
  post_date: string;
  post_date_gmt: string;
  post_excerpt: string;
  post_mime_type: string;
  post_modified: string;
  post_modified_gmt: string;
  post_name: string;
  post_parent: number;
  post_password: string;
  post_status: string;
  post_title: string;
  post_type: string;
  target: string;
  title: string;
  to_ping: string;
  type: string;
  type_label: string;
  url: string;
  xfn: string;
}