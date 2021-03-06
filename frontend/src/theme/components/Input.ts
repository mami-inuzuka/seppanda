export const Input = {
  sizes: {
    lg: {
      field: {
        borderRadius: 'md',
        fontSize: 'lg',
        height: 14,
        paddingX: 4,
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
        _invalid: { borderColor: 'red.500', boxShadow: 'none', _focus: { borderColor: 'red.500' } },
      },
    },
  },
  defaultProps: {
    size: 'lg',
    variant: 'outline',
  },
}
