import { A11yCallout } from "@/components/docs/_shared/a11y-callout";
import { AlertHero, AlertVariants, AlertWithActionAndDismiss } from "@/components/docs/alert/alert-demos";
import { AlertPropsTable } from "@/components/docs/alert/alert-props-table";
import {
  AvatarAddButtonSizes,
  AvatarAddButtonWithGroup,
  AvatarGroupExample,
  AvatarHero,
  AvatarImageFallback,
  AvatarLabelGroupExample,
  AvatarSizes,
  AvatarStatus,
} from "@/components/docs/avatar/avatar-demos";
import { AvatarPropsTable } from "@/components/docs/avatar/avatar-props-table";
import { BadgeDismissible, BadgeFillStyles, BadgeHero, BadgeSizes, BadgeWithDot } from "@/components/docs/badge/badge-demos";
import { BadgePropsTable } from "@/components/docs/badge/badge-props-table";
import { BreadcrumbsHero } from "@/components/docs/breadcrumbs/breadcrumbs-demos";
import { BreadcrumbsPropsTable } from "@/components/docs/breadcrumbs/breadcrumbs-props-table";
import { ButtonHero, ButtonSizes, ButtonStates, ButtonVariants, ButtonWithIcon } from "@/components/docs/button/button-demos";
import { ButtonPropsTable } from "@/components/docs/button/button-props-table";
import { CheckboxHero, CheckboxStates } from "@/components/docs/checkbox/checkbox-demos";
import { CheckboxPropsTable } from "@/components/docs/checkbox/checkbox-props-table";
import { ColorScale, ColorSwatch } from "@/components/docs/_shared/color-scale";
import { ComingSoon } from "@/components/docs/_shared/coming-soon";
import { ComponentPlayground } from "@/components/docs/_shared/component-playground";
import { DividerHero, DividerVertical, DividerWithLabel } from "@/components/docs/divider/divider-demos";
import { DividerPropsTable } from "@/components/docs/divider/divider-props-table";
import { DropdownMenuHero } from "@/components/docs/dropdown-menu/dropdown-menu-demos";
import { DropdownMenuPropsTable } from "@/components/docs/dropdown-menu/dropdown-menu-props-table";
import { FieldError, FieldHero, FieldWithTextarea } from "@/components/docs/field/field-demos";
import { FieldPropsTable } from "@/components/docs/field/field-props-table";
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
import { InputHero, InputSizes, InputStates, InputWithIcons } from "@/components/docs/input/input-demos";
import { InputPropsTable } from "@/components/docs/input/input-props-table";
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
import { CardHero, CardInteractive, CardVariants } from "@/components/docs/card/card-demos";
import { CardPropsTable } from "@/components/docs/card/card-props-table";
import { InstallCommand } from "@/components/docs/_shared/install-command";
import { KbdHero, KbdInMenuItem, KbdSingleKey, KbdThreeKeys } from "@/components/docs/kbd/kbd-demos";
import { KbdGroupPropsTable, KbdPropsTable } from "@/components/docs/kbd/kbd-props-table";
import { ModalHero } from "@/components/docs/modal/modal-demos";
import { ModalPropsTable } from "@/components/docs/modal/modal-props-table";
import { ProgressBarHero, ProgressBarSizes } from "@/components/docs/progress-bar/progress-bar-demos";
import { ProgressBarPropsTable } from "@/components/docs/progress-bar/progress-bar-props-table";
import { PropsTable } from "@/components/docs/_shared/props-table";
import { RadioGroupDisabled, RadioGroupHero } from "@/components/docs/radio-group/radio-group-demos";
import { RadioGroupPropsTable } from "@/components/docs/radio-group/radio-group-props-table";
import { SelectHero, SelectSizes, SelectStates } from "@/components/docs/select/select-demos";
import { SelectPropsTable } from "@/components/docs/select/select-props-table";
import { ToastHero, ToastImperative, ToastVariants } from "@/components/docs/toast/toast-demos";
import { ToastPropsTable } from "@/components/docs/toast/toast-props-table";
import { PaginationHero, PaginationInteractive, PaginationSizes } from "@/components/docs/pagination/pagination-demos";
import { PaginationPropsTable } from "@/components/docs/pagination/pagination-props-table";
import { PopoverHero, PopoverSides, PopoverWithClose } from "@/components/docs/popover/popover-demos";
import { PopoverPropsTable } from "@/components/docs/popover/popover-props-table";
import {
  AlertInstall,
  AvatarInstall,
  BadgeInstall,
  BreadcrumbsInstall,
  ButtonInstall,
  CheckboxInstall,
  DividerInstall,
  DropdownMenuInstall,
  AccordionInstall,
  CardInstall,
  FieldInstall,
  InputInstall,
  KbdInstall,
  ModalInstall,
  PaginationInstall,
  PopoverInstall,
  ProgressBarInstall,
  RadioGroupInstall,
  SelectInstall,
  SkeletonInstall,
  SpinnerInstall,
  SwitchInstall,
  TabsInstall,
  TextareaInstall,
  ToastInstall,
  TooltipInstall,
} from "@/components/docs/_shared/registry-install";
import { SkeletonCard, SkeletonHero, SkeletonVariants } from "@/components/docs/skeleton/skeleton-demos";
import { SkeletonPropsTable } from "@/components/docs/skeleton/skeleton-props-table";
import { SpinnerHero, SpinnerSizes } from "@/components/docs/spinner/spinner-demos";
import { SpinnerPropsTable } from "@/components/docs/spinner/spinner-props-table";
import { SwitchHero, SwitchStates } from "@/components/docs/switch/switch-demos";
import { SwitchPropsTable } from "@/components/docs/switch/switch-props-table";
import { TabsHero, TabsPillVariant } from "@/components/docs/tabs/tabs-demos";
import { TabsPropsTable } from "@/components/docs/tabs/tabs-props-table";
import { TextareaHero, TextareaStates } from "@/components/docs/textarea/textarea-demos";
import { TextareaPropsTable } from "@/components/docs/textarea/textarea-props-table";
import { TooltipHero, TooltipSides } from "@/components/docs/tooltip/tooltip-demos";
import { TooltipPropsTable } from "@/components/docs/tooltip/tooltip-props-table";
import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    A11yCallout,
    ComingSoon,
    ComponentPlayground,
    InstallCommand,
    PropsTable,

    // Foundations
    BlurScale,
    BrandScale,
    ColorScale,
    ColorSwatch,
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
    AvatarStatus,

    // Button
    ButtonHero,
    ButtonInstall,
    ButtonPropsTable,
    ButtonSizes,
    ButtonStates,
    ButtonVariants,
    ButtonWithIcon,

    // Badge
    BadgeDismissible,
    BadgeFillStyles,
    BadgeHero,
    BadgeInstall,
    BadgePropsTable,
    BadgeSizes,
    BadgeWithDot,

    // Input
    InputHero,
    InputInstall,
    InputPropsTable,
    InputSizes,
    InputStates,
    InputWithIcons,

    // Field
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
    CardVariants,

    ...components,
  };
}
