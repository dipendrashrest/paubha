import { A11yCallout } from "@/components/docs/_shared/a11y-callout";
import {
  ColorScale,
  ColorSwatch,
  ColorSwatchGroup,
} from "@/components/docs/_shared/color-scale";
import { ComingSoon } from "@/components/docs/_shared/coming-soon";
import { ComponentPlayground } from "@/components/docs/_shared/component-playground";
import { DocsPre } from "@/components/docs/_shared/docs-pre";
import {
  BlurScale,
  BrandScale,
  ErrorScale,
  GrayScale,
  RadiusScale,
  ShadowScale,
  SpacingScale,
  SuccessScale,
  TypeScale,
  WarningScale,
} from "@/components/docs/_shared/foundation-scales";
import { InstallCommand } from "@/components/docs/_shared/install-command";
import { PropsTable } from "@/components/docs/_shared/props-table";
import {
  AccordionInstall,
  ActivityFeedInstall,
  AlertInstall,
  AvatarInstall,
  BadgeInstall,
  BreadcrumbsInstall,
  ButtonInstall,
  CardInstall,
  CheckboxInstall,
  DialogInstall,
  DividerInstall,
  DropdownMenuInstall,
  FieldInstall,
  InputInstall,
  KbdInstall,
  ModalInstall,
  PaginationInstall,
  PopoverInstall,
  ProgressBarInstall,
  ProgressCircleInstall,
  RadioGroupInstall,
  RegistryInstall,
  SelectInstall,
  SkeletonInstall,
  SliderInstall,
  SpinnerInstall,
  SwitchInstall,
  TableInstall,
  TabsInstall,
  TagInputInstall,
  TextareaInstall,
  ToastInstall,
  ToggleGroupInstall,
  TooltipInstall,
  VerificationCodeInputInstall,
} from "@/components/docs/_shared/registry-install";
import {
  AccordionDisabled,
  AccordionHero,
  AccordionMultiple,
} from "@/components/docs/accordion/accordion-demos";
import {
  AccordionContentPropsTable,
  AccordionItemPropsTable,
  AccordionPropsTable,
  AccordionTriggerPropsTable,
} from "@/components/docs/accordion/accordion-props-table";
import {
  ActivityFeedGrouped,
  ActivityFeedHero,
  ActivityFeedNotifications,
  ActivityFeedSimple,
  ActivityFeedTimeline,
} from "@/components/docs/activity-feed/activity-feed-demos";
import {
  ActivityFeedGroupPropsTable,
  ActivityFeedItemPropsTable,
  ActivityFeedPanelPropsTable,
  ActivityFeedPropsTable,
  ActivityFeedTimelineItemPropsTable,
} from "@/components/docs/activity-feed/activity-feed-props-table";
import {
  AlertHero,
  AlertVariants,
  AlertWithActionAndDismiss,
} from "@/components/docs/alert/alert-demos";
import { AlertPropsTable } from "@/components/docs/alert/alert-props-table";
import { AnnouncementBarHero } from "@/components/docs/announcement-bar/announcement-bar-demos";
import {
  AppNavHero,
  AppSidebarDemo,
} from "@/components/docs/app-nav/app-nav-demos";
import { AuthCardHero } from "@/components/docs/auth-card/auth-card-demos";
import {
  AvatarAddButtonSizes,
  AvatarAddButtonWithGroup,
  AvatarGroupExample,
  AvatarHero,
  AvatarImageFallback,
  AvatarLabelGroupExample,
  AvatarSizes,
  AvatarIndicators,
  AvatarProfilePhotoExample,
  AvatarTypes,
} from "@/components/docs/avatar/avatar-demos";
import { AvatarPropsTable } from "@/components/docs/avatar/avatar-props-table";
import {
  BadgeDismissible,
  BadgeFillStyles,
  BadgeHero,
  BadgeIconOnly,
  BadgeSizes,
  BadgeWithDot,
  BadgeWithIcons,
} from "@/components/docs/badge/badge-demos";
import { BadgePropsTable } from "@/components/docs/badge/badge-props-table";
import { BlogCardHero } from "@/components/docs/blog-card/blog-card-demos";
import {
  BreadcrumbsCollapsed,
  BreadcrumbsDropdownDemo,
  BreadcrumbsHero,
  BreadcrumbsSlash,
} from "@/components/docs/breadcrumbs/breadcrumbs-demos";
import { BreadcrumbsPropsTable } from "@/components/docs/breadcrumbs/breadcrumbs-props-table";
import {
  ButtonDestructive,
  ButtonHero,
  ButtonSizes,
  ButtonStates,
  ButtonVariants,
  ButtonWithIcon,
} from "@/components/docs/button/button-demos";
import { ButtonPropsTable } from "@/components/docs/button/button-props-table";
import {
  CalendarHero,
  CalendarRange,
} from "@/components/docs/calendar/calendar-demos";
import {
  CardHeaderHero,
  CardHeaderWithAvatar,
} from "@/components/docs/card-header/card-header-demos";
import {
  CardHero,
  CardInteractive,
  CardStates,
  CardVariants,
} from "@/components/docs/card/card-demos";
import { CardPropsTable } from "@/components/docs/card/card-props-table";
import {
  ChartDonut,
  ChartHero,
  ChartLine,
} from "@/components/docs/chart/chart-demos";
import {
  CheckboxHero,
  CheckboxSizes,
  CheckboxStates,
} from "@/components/docs/checkbox/checkbox-demos";
import { CheckboxPropsTable } from "@/components/docs/checkbox/checkbox-props-table";
import { CliSnippetHero } from "@/components/docs/cli-snippet/cli-snippet-demos";
import { CommentHero } from "@/components/docs/comment/comment-demos";
import { ConfirmDialogHero } from "@/components/docs/confirm-dialog/confirm-dialog-demos";
import { CookieBannerHero } from "@/components/docs/cookie-banner/cookie-banner-demos";
import { DataToolbarHero } from "@/components/docs/data-toolbar/data-toolbar-demos";
import { DatePickerHero } from "@/components/docs/date-picker/date-picker-demos";
import {
  DialogDestructive,
  DialogHero,
  DialogInfo,
} from "@/components/docs/dialog/dialog-demos";
import {
  DialogActionPropsTable,
  DialogContentPropsTable,
  DialogPropsTable,
} from "@/components/docs/dialog/dialog-props-table";
import {
  DividerHero,
  DividerVertical,
  DividerWithLabel,
} from "@/components/docs/divider/divider-demos";
import { DividerPropsTable } from "@/components/docs/divider/divider-props-table";
import { DropdownMenuHero } from "@/components/docs/dropdown-menu/dropdown-menu-demos";
import { DropdownMenuPropsTable } from "@/components/docs/dropdown-menu/dropdown-menu-props-table";
import { EmptyStateHero } from "@/components/docs/empty-state/empty-state-demos";
import { FaqHero } from "@/components/docs/faq/faq-demos";
import { FeatureListHero } from "@/components/docs/feature-list/feature-list-demos";
import {
  FieldDisabled,
  FieldError,
  FieldHero,
  FieldWithTextarea,
} from "@/components/docs/field/field-demos";
import { FieldPropsTable } from "@/components/docs/field/field-props-table";
import {
  FileUploadHero,
  FileUploadListDemo,
} from "@/components/docs/file-upload/file-upload-demos";
import {
  FilterActive,
  FilterHero,
} from "@/components/docs/filter/filter-demos";
import { IconListHero } from "@/components/docs/icon-list/icon-list-demos";
import {
  IconsHero,
  IconsShowcase,
  IconsUsage,
} from "@/components/docs/icons/icons-showcase";
import {
  InlineCtaCard,
  InlineCtaHero,
} from "@/components/docs/inline-cta/inline-cta-demos";
import {
  InputAddons,
  InputHero,
  InputSizes,
  InputStates,
  InputWithIcons,
} from "@/components/docs/input/input-demos";
import { InputPropsTable } from "@/components/docs/input/input-props-table";
import {
  IntroPositioningAlert,
  SkillMdCard,
} from "@/components/docs/introduction/intro-blocks";
import {
  KbdHero,
  KbdInMenuItem,
  KbdSingleKey,
  KbdThreeKeys,
} from "@/components/docs/kbd/kbd-demos";
import {
  KbdGroupPropsTable,
  KbdPropsTable,
} from "@/components/docs/kbd/kbd-props-table";
import { LogoCloudHero } from "@/components/docs/logo-cloud/logo-cloud-demos";
import { MarketingExamplePreview } from "@/components/docs/marketing-examples/marketing-preview";
import { MarketingHeroDemo } from "@/components/docs/marketing-hero/marketing-hero-demos";
import {
  MetricGroupDemo,
  MetricHero,
  MetricSparkline,
} from "@/components/docs/metric/metric-demos";
import { ModalHero } from "@/components/docs/modal/modal-demos";
import { ModalPropsTable } from "@/components/docs/modal/modal-props-table";
import { NewsletterHero } from "@/components/docs/newsletter/newsletter-demos";
import {
  PageHeaderHero,
  PageHeaderWithBreadcrumb,
} from "@/components/docs/page-header/page-header-demos";
import {
  PaginationHero,
  PaginationInteractive,
  PaginationSizes,
} from "@/components/docs/pagination/pagination-demos";
import { PaginationPropsTable } from "@/components/docs/pagination/pagination-props-table";
import {
  PopoverHero,
  PopoverSides,
  PopoverWithClose,
} from "@/components/docs/popover/popover-demos";
import { PopoverPropsTable } from "@/components/docs/popover/popover-props-table";
import {
  PricingCardFeatured,
  PricingCardHero,
} from "@/components/docs/pricing-card/pricing-card-demos";
import {
  ProgressBarHero,
  ProgressBarSizes,
} from "@/components/docs/progress-bar/progress-bar-demos";
import { ProgressBarPropsTable } from "@/components/docs/progress-bar/progress-bar-props-table";
import {
  ProgressCircleHero,
  ProgressCircleNoPercentage,
  ProgressCircleSizes,
} from "@/components/docs/progress-circle/progress-circle-demos";
import { ProgressCirclePropsTable } from "@/components/docs/progress-circle/progress-circle-props-table";
import {
  ProgressStepsHero,
  ProgressStepsVertical,
} from "@/components/docs/progress-steps/progress-steps-demos";
import {
  RadioGroupDisabled,
  RadioGroupHero,
} from "@/components/docs/radio-group/radio-group-demos";
import { RadioGroupPropsTable } from "@/components/docs/radio-group/radio-group-props-table";
import { SearchFieldHero } from "@/components/docs/search-field/search-field-demos";
import {
  SectionHeaderBordered,
  SectionHeaderHero,
} from "@/components/docs/section-header/section-header-demos";
import {
  SelectHero,
  SelectSizes,
  SelectStates,
} from "@/components/docs/select/select-demos";
import { SelectPropsTable } from "@/components/docs/select/select-props-table";
import { SettingsRowHero } from "@/components/docs/settings-row/settings-row-demos";
import { SiteFooterHero } from "@/components/docs/site-footer/site-footer-demos";
import {
  SkeletonCard,
  SkeletonHero,
  SkeletonVariants,
} from "@/components/docs/skeleton/skeleton-demos";
import { SkeletonPropsTable } from "@/components/docs/skeleton/skeleton-props-table";
import {
  SliderHero,
  SliderSizes,
  SliderStates,
} from "@/components/docs/slider/slider-demos";
import { SliderPropsTable } from "@/components/docs/slider/slider-props-table";
import {
  SpinnerHero,
  SpinnerSizes,
} from "@/components/docs/spinner/spinner-demos";
import { SpinnerPropsTable } from "@/components/docs/spinner/spinner-props-table";
import {
  SwitchHero,
  SwitchStates,
} from "@/components/docs/switch/switch-demos";
import { SwitchPropsTable } from "@/components/docs/switch/switch-props-table";
import {
  TableBordered,
  TableHero,
  TableStriped,
} from "@/components/docs/table/table-demos";
import { TablePropsTable } from "@/components/docs/table/table-props-table";
import {
  TabsHero,
  TabsPillVariant,
  TabsWithIcons,
} from "@/components/docs/tabs/tabs-demos";
import { TabsPropsTable } from "@/components/docs/tabs/tabs-props-table";
import {
  TagInputDisabled,
  TagInputError,
  TagInputHero,
  TagInputSizes,
} from "@/components/docs/tag-input/tag-input-demos";
import { TagInputPropsTable } from "@/components/docs/tag-input/tag-input-props-table";
import { TeamCardHero } from "@/components/docs/team-card/team-card-demos";
import {
  TestimonialGridDemo,
  TestimonialHero,
} from "@/components/docs/testimonial/testimonial-demos";
import {
  TextareaHero,
  TextareaStates,
} from "@/components/docs/textarea/textarea-demos";
import { TextareaPropsTable } from "@/components/docs/textarea/textarea-props-table";
import {
  ToastHero,
  ToastImperative,
  ToastVariants,
} from "@/components/docs/toast/toast-demos";
import { ToastPropsTable } from "@/components/docs/toast/toast-props-table";
import {
  ToggleGroupDisabled,
  ToggleGroupHero,
  ToggleGroupSizes,
} from "@/components/docs/toggle-group/toggle-group-demos";
import {
  ToggleGroupItemPropsTable,
  ToggleGroupPropsTable,
} from "@/components/docs/toggle-group/toggle-group-props-table";
import {
  TooltipHero,
  TooltipSides,
} from "@/components/docs/tooltip/tooltip-demos";
import { TooltipPropsTable } from "@/components/docs/tooltip/tooltip-props-table";
import { UserMenuHero } from "@/components/docs/user-menu/user-menu-demos";
import {
  VerificationCodeInputDisabled,
  VerificationCodeInputError,
  VerificationCodeInputHero,
  VerificationCodeInputLength,
} from "@/components/docs/verification-code-input/verification-code-input-demos";
import { VerificationCodeInputPropsTable } from "@/components/docs/verification-code-input/verification-code-input-props-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    pre: DocsPre,
    A11yCallout,
    ComingSoon,
    ComponentPlayground,
    IconsHero,
    IconsShowcase,
    IconsUsage,
    InstallCommand,
    IntroPositioningAlert,
    PropsTable,
    SkillMdCard,

    // Foundations
    BlurScale,
    BrandScale,
    ColorScale,
    ColorSwatch,
    ColorSwatchGroup,
    ErrorScale,
    GrayScale,
    RadiusScale,
    ShadowScale,
    SpacingScale,
    SuccessScale,
    TypeScale,
    WarningScale,

    // Avatar
    AvatarAddButtonSizes,
    AvatarAddButtonWithGroup,
    AvatarGroupExample,
    AvatarHero,
    AvatarImageFallback,
    AvatarInstall,
    AvatarLabelGroupExample,
    AvatarPropsTable,
    AvatarSizes,
    AvatarIndicators,
    AvatarProfilePhotoExample,
    AvatarTypes,

    // Button
    ButtonHero,
    ButtonInstall,
    ButtonPropsTable,
    ButtonSizes,
    ButtonStates,
    ButtonVariants,
    ButtonDestructive,
    ButtonWithIcon,

    // Badge
    BadgeDismissible,
    BadgeFillStyles,
    BadgeHero,
    BadgeIconOnly,
    BadgeInstall,
    BadgePropsTable,
    BadgeSizes,
    BadgeWithDot,
    BadgeWithIcons,

    // Input
    InputHero,
    InputInstall,
    InputPropsTable,
    InputSizes,
    InputStates,
    InputAddons,
    InputWithIcons,

    // Field
    FieldDisabled,
    FieldError,
    FieldHero,
    FieldInstall,
    FieldPropsTable,
    FieldWithTextarea,

    // Textarea
    TextareaHero,
    TextareaInstall,
    TextareaPropsTable,
    TextareaStates,

    // Checkbox
    CheckboxHero,
    CheckboxInstall,
    CheckboxPropsTable,
    CheckboxSizes,
    CheckboxStates,

    // Radio Group
    RadioGroupDisabled,
    RadioGroupHero,
    RadioGroupInstall,
    RadioGroupPropsTable,

    // Switch
    SwitchHero,
    SwitchInstall,
    SwitchPropsTable,
    SwitchStates,

    // Alert
    AlertHero,
    AlertInstall,
    AlertPropsTable,
    AlertVariants,
    AlertWithActionAndDismiss,

    // Spinner
    SpinnerHero,
    SpinnerInstall,
    SpinnerPropsTable,
    SpinnerSizes,

    // Divider
    DividerHero,
    DividerInstall,
    DividerPropsTable,
    DividerVertical,
    DividerWithLabel,

    // Skeleton
    SkeletonCard,
    SkeletonHero,
    SkeletonInstall,
    SkeletonPropsTable,
    SkeletonVariants,

    // Progress Bar
    ProgressBarHero,
    ProgressBarInstall,
    ProgressBarPropsTable,
    ProgressBarSizes,

    // Breadcrumbs
    BreadcrumbsHero,
    BreadcrumbsSlash,
    BreadcrumbsCollapsed,
    BreadcrumbsDropdownDemo,
    BreadcrumbsInstall,
    BreadcrumbsPropsTable,

    // Tooltip
    TooltipHero,
    TooltipInstall,
    TooltipPropsTable,
    TooltipSides,

    // Dropdown Menu
    DropdownMenuHero,
    DropdownMenuInstall,
    DropdownMenuPropsTable,

    // Modal
    ModalHero,
    ModalInstall,
    ModalPropsTable,

    // Tabs
    TabsHero,
    TabsInstall,
    TabsPillVariant,
    TabsPropsTable,
    TabsWithIcons,

    // Select
    SelectHero,
    SelectInstall,
    SelectPropsTable,
    SelectSizes,
    SelectStates,

    // Toast
    ToastHero,
    ToastImperative,
    ToastInstall,
    ToastPropsTable,
    ToastVariants,

    // Pagination
    PaginationHero,
    PaginationInstall,
    PaginationInteractive,
    PaginationPropsTable,
    PaginationSizes,

    // Popover
    PopoverHero,
    PopoverInstall,
    PopoverPropsTable,
    PopoverSides,
    PopoverWithClose,

    // Kbd
    KbdGroupPropsTable,
    KbdHero,
    KbdInMenuItem,
    KbdInstall,
    KbdPropsTable,
    KbdSingleKey,
    KbdThreeKeys,

    // Accordion
    AccordionContentPropsTable,
    AccordionDisabled,
    AccordionHero,
    AccordionInstall,
    AccordionItemPropsTable,
    AccordionMultiple,
    AccordionPropsTable,
    AccordionTriggerPropsTable,

    // Card
    CardHero,
    CardInstall,
    CardInteractive,
    CardPropsTable,
    CardStates,
    CardVariants,

    // Slider
    SliderHero,
    SliderInstall,
    SliderPropsTable,
    SliderSizes,
    SliderStates,

    // Toggle Group
    ToggleGroupDisabled,
    ToggleGroupHero,
    ToggleGroupInstall,
    ToggleGroupItemPropsTable,
    ToggleGroupPropsTable,
    ToggleGroupSizes,

    // Progress Circle
    ProgressCircleHero,
    ProgressCircleInstall,
    ProgressCircleNoPercentage,
    ProgressCirclePropsTable,
    ProgressCircleSizes,

    // Verification Code Input
    VerificationCodeInputDisabled,
    VerificationCodeInputError,
    VerificationCodeInputHero,
    VerificationCodeInputInstall,
    VerificationCodeInputLength,
    VerificationCodeInputPropsTable,

    // Dialog
    DialogActionPropsTable,
    DialogContentPropsTable,
    DialogDestructive,
    DialogHero,
    DialogInfo,
    DialogInstall,
    DialogPropsTable,

    // Table
    TableBordered,
    TableHero,
    TableInstall,
    TablePropsTable,
    TableStriped,

    // Tag Input
    TagInputDisabled,
    TagInputError,
    TagInputHero,
    TagInputInstall,
    TagInputPropsTable,
    TagInputSizes,

    // Activity Feed (application pattern)
    ActivityFeedGrouped,
    ActivityFeedGroupPropsTable,
    ActivityFeedHero,
    ActivityFeedInstall,
    ActivityFeedItemPropsTable,
    ActivityFeedNotifications,
    ActivityFeedPanelPropsTable,
    ActivityFeedPropsTable,
    ActivityFeedSimple,
    ActivityFeedTimeline,
    ActivityFeedTimelineItemPropsTable,

    // Card Header (application pattern)
    CardHeaderHero,
    CardHeaderWithAvatar,

    // Page Header (application pattern)
    PageHeaderHero,
    PageHeaderWithBreadcrumb,

    // Section Header (application pattern)
    SectionHeaderBordered,
    SectionHeaderHero,

    // Metric (application pattern)
    MetricGroupDemo,
    MetricHero,
    MetricSparkline,

    // Progress Steps (application pattern)
    ProgressStepsHero,
    ProgressStepsVertical,

    // Empty State (application pattern)
    EmptyStateHero,

    // Chart (application pattern)
    ChartDonut,
    ChartHero,
    ChartLine,

    // Calendar (application pattern)
    CalendarHero,
    CalendarRange,

    // App Nav (application pattern)
    AppNavHero,
    AppSidebarDemo,

    // Inline CTA (application pattern)
    InlineCtaCard,
    InlineCtaHero,

    // Filter (application pattern)
    FilterActive,
    FilterHero,

    // File Upload (application pattern)
    FileUploadHero,
    FileUploadListDemo,

    // New marketing patterns
    AnnouncementBarHero,
    LogoCloudHero,
    SiteFooterHero,
    TestimonialHero,
    TestimonialGridDemo,
    NewsletterHero,
    MarketingHeroDemo,
    PricingCardHero,
    PricingCardFeatured,
    FaqHero,
    FeatureListHero,
    CliSnippetHero,
    IconListHero,
    BlogCardHero,
    TeamCardHero,
    DatePickerHero,
    UserMenuHero,
    SearchFieldHero,
    ConfirmDialogHero,
    SettingsRowHero,
    CommentHero,
    DataToolbarHero,
    AuthCardHero,
    CookieBannerHero,

    // Marketing Examples
    MarketingExamplePreview,

    // Lean install for other application patterns
    RegistryInstall,

    ...components,
  };
}
