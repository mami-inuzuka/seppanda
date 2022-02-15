export const Input = {
  sizes: {
    lg: {
      field: {
        borderRadius: 'md',
        fontSize: 'lg',
        height: 14,
        paddingX: 4,
        mb: 4,
      },
    },
  },
  variants: {
    outline: {
      field: {
        background: 'white',
        borderColor: 'inherit',
        _focus: {
          zIndex: 1,
          borderColor: 'brand.primary',
          boxShadow: 0,
        },
      },
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'outline',
  },
}
